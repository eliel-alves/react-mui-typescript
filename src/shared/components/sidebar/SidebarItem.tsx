import { ListItemButton, ListItemIcon, Icon, ListItemText } from "@mui/material"

interface ISidebarItemProps {
  name: string,
  icon: string
};

export const SidebarItem = ({ name, icon }: ISidebarItemProps) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  )
}