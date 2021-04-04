import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import {
   Divider,
   ListItem,
   ListItemIcon,
   ListItemText,
   List,
} from "@material-ui/core";
import {
   FavoriteBorder,
   FitnessCenter,
   Healing,
   ViewCarousel,
   Voicemail,
} from "@material-ui/icons";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";

function ListItemLink(props) {
   return <ListItem button component="a" {...props} />;
}

export const menuList = [
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItem button>
            <ListItemIcon>
               <i class="fas fa-walking fa-lg" />
            </ListItemIcon>

            <ListItemLink href="/">
               <ListItemText primary="런닝머신" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <DirectionsBikeIcon />
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
               <FitnessCenter />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="바벨" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <i class="fas fa-dumbbell fa-lg" />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="덤벨" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <i class="fas fa-life-ring  fa-lg" />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="원판" />
            </ListItemLink>
         </ListItem>
         <ListItem button>
            <ListItemIcon>
               <i class="fas fa-torii-gate fa-lg" />
            </ListItemIcon>
            <ListItemLink href="/">
               <ListItemText primary="기구" />
            </ListItemLink>
         </ListItem>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItemLink href="/">
            <ListItemIcon>
               <i class="fas fa-universal-access fa-lg" />
            </ListItemIcon>
            <ListItemText primary="운동보조기구" />
         </ListItemLink>
         <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
            <ListItem button>
               <ListItemIcon>
                  <Healing />
               </ListItemIcon>
               <ListItemLink href="/">
                  <ListItemText primary="밴드" />
               </ListItemLink>
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                  <Voicemail />
               </ListItemIcon>
               <ListItemLink href="/">
                  <ListItemText primary="스트랩" />
               </ListItemLink>
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                  <i class="fas fa-band-aid fa-lg" />
               </ListItemIcon>
               <ListItemLink href="/">
                  <ListItemText primary="벨트" />
               </ListItemLink>
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                  <i class="fas fa-hashtag fa-lg" />
               </ListItemIcon>
               <ListItemLink href="/">
                  <ListItemText primary="기구" />
               </ListItemLink>
            </ListItem>
         </List>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
         <ListItemLink href="/">
            <ListItemIcon>
               <i class="fas fa-hand-holding-heart fa-lg" />
            </ListItemIcon>
            <ListItemText primary="마사지 기구" />
         </ListItemLink>
         <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
            <ListItem button>
               <ListItemIcon>
                  <i class="fas fa-grip-lines fa-lg" />
               </ListItemIcon>
               <ListItemLink href="/">
                  <ListItemText primary="폼롤러" />
               </ListItemLink>
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                  <ViewCarousel />
               </ListItemIcon>
               <ListItemLink href="/">
                  <ListItemText primary="요가매트" />
               </ListItemLink>
            </ListItem>
         </List>
      </List>
   </>,
];
