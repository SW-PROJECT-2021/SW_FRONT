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
         <ListItemLink href="/#/list?range=유산소&category=런닝머신">
            <ListItemIcon>
               <i className="fas fa-walking fa-lg" />
            </ListItemIcon>
            <ListItemText primary="런닝머신" />
         </ListItemLink>
         <ListItemLink href="/#/list?range=유산소&category=사이클">
            <ListItemIcon>
               <DirectionsBikeIcon />
            </ListItemIcon>
            <ListItemText primary="사이클" />
         </ListItemLink>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItemLink href="/#/list?range=웨이트&category=바벨">
            <ListItemIcon>
               <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary="바벨" />
         </ListItemLink>
         <ListItemLink href="/#/list?range=웨이트&category=덤벨">
            <ListItemIcon>
               <i className="fas fa-dumbbell fa-lg" />
            </ListItemIcon>
            <ListItemText primary="덤벨" />
         </ListItemLink>
         <ListItemLink href="/#/list?range=웨이트&category=원판">
            <ListItemIcon>
               <i className="fas fa-life-ring  fa-lg" />
            </ListItemIcon>
            <ListItemText primary="원판" />
         </ListItemLink>
         <ListItemLink href="/#/list?range=웨이트&category=기구">
            <ListItemIcon>
               <i className="fas fa-torii-gate fa-lg" />
            </ListItemIcon>
            <ListItemText primary="기구" />
         </ListItemLink>
      </List>
   </>,
   <>
      <List component="nav" aria-label="main mailbox folders">
         <ListItemLink href="/#/list?range=보조&category=운동보조기구">
            <ListItemIcon>
               <i className="fas fa-universal-access fa-lg" />
            </ListItemIcon>
            <ListItemText primary="운동보조기구" />
         </ListItemLink>
         <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
            <ListItemLink href="/#/list?range=보조&category=운동보조기구&category2=밴드">
               <ListItemIcon>
                  <Healing />
               </ListItemIcon>
               <ListItemText primary="밴드" />
            </ListItemLink>
            <ListItemLink href="/#/list?range=보조&category=운동보조기구&category2=스트랩">
               <ListItemIcon>
                  <Voicemail />
               </ListItemIcon>
               <ListItemText primary="스트랩" />
            </ListItemLink>
            <ListItemLink href="/#/list?range=belt">
               <ListItemIcon>
                  <i className="fas fa-band-aid fa-lg" />
               </ListItemIcon>
               <ListItemText primary="벨트" />
            </ListItemLink>
            <ListItemLink href="/#/list?range=보조&category=운동보조기구&category2=기구">
               <ListItemIcon>
                  <i className="fas fa-hashtag fa-lg" />
               </ListItemIcon>
               <ListItemText primary="기구" />
            </ListItemLink>
         </List>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
         <ListItemLink href="/#/list?range=보조&category=마사지기구">
            <ListItemIcon>
               <i className="fas fa-hand-holding-heart fa-lg" />
            </ListItemIcon>
            <ListItemText primary="마사지 기구" />
         </ListItemLink>
         <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
            <ListItemLink href="/#/list?range=보조&category=마사지기구&category2=폼롤러">
               <ListItemIcon>
                  <i className="fas fa-grip-lines fa-lg" />
               </ListItemIcon>
               <ListItemText primary="폼롤러" />
            </ListItemLink>
            <ListItemLink href="/#/list?range=보조&category=마사지기구&category2=요가매트">
               <ListItemIcon>
                  <ViewCarousel />
               </ListItemIcon>
               <ListItemText primary="요가매트" />
            </ListItemLink>
         </List>
      </List>
   </>,
];
