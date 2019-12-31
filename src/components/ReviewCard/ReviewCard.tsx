import React, { useContext } from 'react';
import Markdown from 'react-markdown';
import { useHistory } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import FallIcon from '@material-ui/icons/Eco';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import SpringIcon from '@material-ui/icons/EmojiNature';
import SummerIcon from '@material-ui/icons/Brightness5';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import UnknownIcon from '@material-ui/icons/Help';
import Grow from '../Grow';
import { AuthContext } from '../Auth';
import { IReview } from '../../data/interfaces';
import { reviewMeta } from '../../constants';
import { useStyles } from './ReviewCard.styles';

interface IProps {
  review: IReview;
  deepLink: (id: string) => string;
  onDeepLinkCopy: () => void;
}

const ReviewCard: React.FC<IProps> = ({
  review: {
    id,
    author,
    course,
    semester,
    difficulty: d,
    workload: w,
    rating: r,
    body,
    created
  },
  deepLink,
  onDeepLinkCopy
}) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const xs = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const avatar = xs ? null : semester.season === 1 ? (
    <Avatar className={classes.spring}>
      <SpringIcon />
    </Avatar>
  ) : semester.season === 2 ? (
    <Avatar className={classes.summer}>
      <SummerIcon />
    </Avatar>
  ) : semester.season === 3 ? (
    <Avatar className={classes.fall}>
      <FallIcon />
    </Avatar>
  ) : (
    <Avatar>
      <UnknownIcon />
    </Avatar>
  );

  const title = xs ? course.id : `${course.id}: ${course.name}`;
  const subheader = new Date(created).toLocaleString();
  const difficulty = d && reviewMeta.translateDifficulty(d);
  const rating = r && reviewMeta.translateRating(r);
  const workload = w && `${w} hrs/wk`;

  const chips: Array<ChipProps & { tooltip: string }> = [
    {
      className: (classes as any)[`difficulty${d}`],
      label: difficulty,
      tooltip: 'Difficulty'
    },
    {
      className: (classes as any)[`rating${r}`],
      label: rating,
      tooltip: 'Rating'
    },
    {
      label: workload,
      tooltip: 'Workload'
    }
  ].filter(chip => Boolean(chip?.label));
  xs && chips.pop() && chips.pop();

  const handleEditClick = () => history.push(`/review/${id}`);

  const action = xs ? null : auth.user?.uid === author.id ? (
    <IconButton onClick={handleEditClick} color="inherit">
      <EditIcon />
    </IconButton>
  ) : (
    <CopyToClipboard text={deepLink(id)} onCopy={onDeepLinkCopy}>
      <Tooltip title="Copy link">
        <IconButton color="inherit">
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={avatar}
        title={title}
        subheader={subheader}
        action={action}
      />
      <CardContent className={classes.content}>
        {body ? (
          <Markdown source={body} />
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            No commentary provided.
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Chip label={semester.name} variant="outlined" color="primary" />
        <Grow />
        {chips.map(({ tooltip, label, ...rest }) => (
          <Tooltip title={tooltip} key={label!.toString()}>
            <Chip label={label} variant="outlined" {...rest} />
          </Tooltip>
        ))}
      </CardActions>
    </Card>
  );
};

export default ReviewCard;
