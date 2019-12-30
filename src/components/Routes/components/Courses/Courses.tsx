import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HeadCell, { SortKey, SortDirection, cells } from './components/HeadCell';
import Toolbar from './components/Toolbar';
import Stats from './components/Stats';
import compare from '../../../../utils/compare';
import stableSort from '../../../../utils/stableSort';
import useSession from '../../../../utils/useSessionStorage';
import Loading from '../../../Loading/Loading';
import { NotificationContext } from '../../../Notification/Notification';
import { ICourse } from '../../../../data/interfaces';
import { useStyles } from './Courses.styles';

const sort = (a: ICourse, b: ICourse, orderBy: SortKey): number => {
  const aMetric = a.metric?.data;
  const bMetric = b.metric?.data;
  switch (orderBy) {
    case SortKey.Id:
      return compare(a.id, b.id);
    case SortKey.Name:
      return compare(a.name, b.name);
    case SortKey.Foundational:
      return compare(a.foundational, b.foundational);
    case SortKey.Deprecated:
      return compare(a.deprecated, b.deprecated);
    case SortKey.Reviews:
      return compare(aMetric?.review_count, bMetric?.review_count);
    case SortKey.Difficulty:
      return compare(aMetric?.difficulty.mean, bMetric?.difficulty.mean);
    case SortKey.Workload:
      return compare(aMetric?.workload.mean, bMetric?.workload.mean);
    case SortKey.Rating:
      return compare(aMetric?.rating.mean, bMetric?.rating.mean);
    default:
      return 0;
  }
};

interface IProps {
  courses?: ICourse[];
  loading?: boolean;
}

const Courses: React.FC<IProps> = ({ courses, loading }) => {
  const classes = useStyles();
  const history = useHistory();
  const notification = useContext(NotificationContext)!;
  const [orderBy, setOrderBy] = useSession<SortKey>('/c:ob', SortKey.Id);
  const [order, setOrder] = useSession<SortDirection>('/c:o', 'asc');
  const [size, setSize] = useSession<'small' | 'medium'>('/c:s', 'medium');
  const [filter, setFilter] = useSession<string>('/c:f', '');
  const [foundational, setFoundational] = useSession<boolean>('/c:fo', false);
  const [deprecated, setDeprecated] = useSession<boolean>('/c:d', true);

  const handleHeadCellClick = (id: SortKey) => () => {
    const isDesc = orderBy === id && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(id);
  };

  const handleBodyRowClick = (c: ICourse) => () => {
    if (c.metric?.data.review_count) {
      history.push(`/course/${c.id}`);
    } else {
      notification.warning('There are no reviews for this course.');
    }
  };

  const sortBy: (a: ICourse, b: ICourse) => number = useMemo(
    () =>
      order === 'desc'
        ? (a, b) => -sort(a, b, orderBy)
        : (a, b) => +sort(a, b, orderBy),
    [order, orderBy]
  );

  const filterRegex = new RegExp(filter, 'i');
  const filterBy: (course: ICourse) => boolean = useMemo(
    () => c =>
      (deprecated || !c.deprecated) &&
      (!foundational || c.foundational) &&
      (!filter || filterRegex.test([c.id, c.department, c.name].join(' '))),
    [deprecated, foundational, filter, filterRegex]
  );

  if (loading) {
    return <Loading />;
  }

  if (!courses?.length) {
    return null;
  }

  const filtered = courses.filter(filterBy);

  return (
    <Container component="main" maxWidth="xl">
      <div className={classes.paper}>
        <Toolbar
          size={size}
          onSizeChange={setSize}
          foundational={foundational}
          onFoundationalChange={setFoundational}
          deprecated={deprecated}
          onDeprecatedChange={setDeprecated}
          filter={filter}
          onFilterChange={setFilter}
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} size={size} aria-label="courses">
            <TableHead>
              <TableRow>
                {cells.map(id => (
                  <HeadCell
                    key={id}
                    id={id}
                    onClick={handleHeadCellClick(id)}
                    orderBy={orderBy}
                    order={order}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={cells.length}>No matches...</TableCell>
                </TableRow>
              )}
              {stableSort<ICourse>(filtered, sortBy).map(c => (
                <TableRow key={c.id} onClick={handleBodyRowClick(c)} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell className={classes.name}>
                    {c.name}
                    &nbsp;
                    {c.foundational && <sup>f</sup>}
                    {c.deprecated && <sup>d</sup>}
                  </TableCell>
                  <TableCell align="center">
                    {c.metric?.data.review_count}
                  </TableCell>
                  <TableCell align="center">
                    <Stats {...c.metric?.data.difficulty} min={1} max={5} />
                  </TableCell>
                  <TableCell align="center">
                    <Stats {...c.metric?.data.workload} min={1} />
                  </TableCell>
                  <TableCell align="center">
                    <Stats {...c.metric?.data.rating} min={1} max={5} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default Courses;
