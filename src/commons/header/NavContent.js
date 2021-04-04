import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { List } from "@material-ui/core";

import {
   Divider,
   ListItem,
   ListItemIcon,
   ListItemText,
} from "@material-ui/core";

function ListItemLink(props) {
   return <ListItem button component="a" {...props} />;
}

export const menuList = [
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItem button>
            <ListItemIcon>
               <InboxIcon />
            </ListItemIcon>

            <ListItemLink href="/">
               <ListItemText primary="런닝머신" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="사이클" />
            </ListItemLink>
         </ListItem>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItem button>
            <ListItemIcon>
               <InboxIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="바벨" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="덤벨" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="원판" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="기구" />
            </ListItemLink>
         </ListItem>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItem button>
            <ListItemIcon>
               <InboxIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="밴드" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="스트랩" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="벨트" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="기구" />
            </ListItemLink>
         </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="폼롤러" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DraftsIcon />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="요가매트" />
            </ListItemLink>
         </ListItem>
      </List>
   </>,
];
