import {
   Divider,
   ListItem,
   ListItemIcon,
   ListItemText,
   List,
} from "@material-ui/core";
import {
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
         <ListItemLink href="/">
            <ListItemIcon>
               <i className="fas fa-walking fa-lg" />
            </ListItemIcon>
            <ListItemText primary="런닝머신" />
         </ListItemLink>
         <ListItemLink href="/">
            <ListItemIcon>
               <DirectionsBikeIcon />
            </ListItemIcon>
            <ListItemText primary="사이클" />
         </ListItemLink>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItemLink href="/">
            <ListItemIcon>
               <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary="바벨" />
         </ListItemLink>
         <ListItemLink href="/">
            <ListItemIcon>
               <i className="fas fa-dumbbell fa-lg" />
            </ListItemIcon>
            <ListItemText primary="덤벨" />
         </ListItemLink>
         <ListItemLink href="/">
            <ListItemIcon>
               <i className="fas fa-life-ring  fa-lg" />
            </ListItemIcon>
            <ListItemText primary="원판" />
         </ListItemLink>
         <ListItemLink href="/">
            <ListItemIcon>
               <i className="fas fa-torii-gate fa-lg" />
            </ListItemIcon>
            <ListItemText primary="기구" />
         </ListItemLink>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItemLink href="/">
            <ListItemIcon>
               <i className="fas fa-universal-access fa-lg" />
            </ListItemIcon>
            <ListItemText primary="운동보조기구" />
         </ListItemLink>
         <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
            <ListItemLink href="/">
               <ListItemIcon>
                  <Healing />
               </ListItemIcon>
               <ListItemText primary="밴드" />
            </ListItemLink>
            <ListItemLink href="/">
               <ListItemIcon>
                  <Voicemail />
               </ListItemIcon>
               <ListItemText primary="스트랩" />
            </ListItemLink>
            <ListItemLink href="/">
               <ListItemIcon>
                  <i className="fas fa-band-aid fa-lg" />
               </ListItemIcon>
               <ListItemText primary="벨트" />
            </ListItemLink>
            <ListItemLink href="/">
               <ListItemIcon>
                  <i className="fas fa-hashtag fa-lg" />
               </ListItemIcon>
               <ListItemText primary="기구" />
            </ListItemLink>
         </List>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
         <ListItemLink href="/">
            <ListItemIcon>
               <i className="fas fa-hand-holding-heart fa-lg" />
            </ListItemIcon>
            <ListItemText primary="마사지 기구" />
         </ListItemLink>
         <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
            <ListItemLink href="/">
               <ListItemIcon>
                  <i className="fas fa-grip-lines fa-lg" />
               </ListItemIcon>
               <ListItemText primary="폼롤러" />
            </ListItemLink>
            <ListItemLink href="/">
               <ListItemIcon>
                  <ViewCarousel />
               </ListItemIcon>
               <ListItemText primary="요가매트" />
            </ListItemLink>
         </List>
      </List>
   </>,
];
