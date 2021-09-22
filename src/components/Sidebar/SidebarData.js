import GroupIcon from '@material-ui/icons/Group';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ForumIcon from '@material-ui/icons/Forum';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CategoryIcon from '@material-ui/icons/Category';

export const SidebarData = [
    { 
       title: 'User Management',
       path: '/viewusers',
       icon: <GroupIcon />,
    },
    { 
        title: 'Course Issues',
        path: '#',
        icon: <MenuBookIcon />,
        iconClosed: <ArrowDropDownIcon />,
        iconOpened: <ArrowDropUpIcon />,
        subNav: [
            {
              title: 'Courses',
              path: '/viewcourse/managecourses',
              icon: <LibraryBooksIcon />,
              cName: 'sub-nav'
            },
            {
              title: 'Tags',
              path: '/viewcourse/tags',
              icon: <LocalOfferIcon />,
              cName: 'sub-nav'
            },
            {
              title: 'Forums',
              path: '/viewcourse/forum',
              icon: <ForumIcon />
            }
          ]
    },
    { 
        title: 'Financials',
        path: '#',
        icon: <CreditCardIcon />,
        iconClosed: <ArrowDropDownIcon />,
        iconOpened: <ArrowDropUpIcon />,
        subNav: [
            {
              title: 'Insights',
              path: '/finance/insights',
              icon:  <TrendingUpIcon />,
              cName: 'sub-nav'
            },
            {
              title: 'Course Earnings',
              path: '/finance/courses',
              icon: <AttachMoneyIcon />,
              cName: 'sub-nav'
            },
            {
              title: 'User Earnings',
              path: '/finance/users',
              icon: <AssignmentIndIcon />
            },
            {
                title: 'Tag Earnings',
                path: '/finance/tags',
                icon: <CategoryIcon />
              }
          ]
    }


]