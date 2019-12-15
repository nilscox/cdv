import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import MaterialLink from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import { SubjectBody, SubjectHeader } from './SubjectComponent';
import SearchField from 'src/dashboard/components/SearchField';
import Pagination from 'src/dashboard/components/Pagination';
import Loader from 'src/dashboard/components/Loader';
import Flex from 'src/components/common/Flex';
import Link from 'src/components/common/Link';

import useUpdateEffect from 'src/hooks/use-update-effect';
import useAxios from 'src/hooks/use-axios';
import { Paginated, paginatedResults } from 'src/utils/parse-paginated';
import { Subject, parseSubject } from 'src/types/Subject';

const useSubjects = (informationId: number, search: string, page: number) => {
  const [result, refetch] = useAxios<Paginated<Subject>>(
    `/api/information/${informationId}/subjects`,
    paginatedResults(parseSubject),
  );

  useUpdateEffect(() => {
    const opts: any = { params: {} };

    if (search)
      opts.params.search = search;

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page, search]);

  return result;
};

const useStyles = makeStyles((theme: Theme) => ({
  panelSummary: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelDetail: {
    flexDirection: 'column',
  },
  icon: {
    paddingLeft: 5,
    fill: '#999',
  },
  bottomLink: {
    alignSelf: 'center',
    paddingTop: 24,
  },
  bottomLinkColor: {
    color: theme.palette.secondary.dark,
  },
}));

const SubjectsList: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const informationId = Number(match.params.id);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { loading, data } = useSubjects(informationId, search, page);

  const [expanded, setExpanded] = useState<number | false>(false);
  const classes = useStyles({});

  const handleChange = (subjectId: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? subjectId : false);
  };

  const renderSubject = (subject: Subject) => (
    <ExpansionPanel key={subject.id} expanded={expanded === subject.id} onChange={handleChange(subject.id)}>

      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ content: classes.panelSummary }}>
        <div>
          <SubjectHeader subject={subject} />
        </div>

        <Link to={`/information/${informationId}/thematiques/${subject.id}`}>
          <Flex flexDirection="row" alignItems="center">
            <Typography variant="caption" color="textSecondary">{ subject.reactionsCount }</Typography>
            <MessageIcon fontSize="small" className={classes.icon} />
          </Flex>
        </Link>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={classes.panelDetail}>
        <SubjectBody subject={subject} />

        <Divider />

        <Link to={`/information/${informationId}/thematiques/${subject.id}`} className={classes.bottomLink}>
          <MaterialLink className={classes.bottomLinkColor} component="span">Voir les réactions</MaterialLink>
        </Link>
      </ExpansionPanelDetails>

    </ExpansionPanel>
  );

  return (
    <>
      <Flex flexDirection="row">
        <SearchField onSearch={setSearch} />
        <Pagination page={page} pageSize={10} total={data ? data.total : undefined} onPageChange={setPage} />
      </Flex>

      { loading
        ? <Loader />
        : data.items.map(renderSubject)
      }
    </>
  );
};

export default SubjectsList;
