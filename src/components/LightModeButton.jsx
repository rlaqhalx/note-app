import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

function LightModeButton() {

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme ===  'dark';
  
  return (
    <ActionIcon 
      variant="default" 
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()} 
      size={30}
    >
      {colorScheme === "dark" ? (
        <IconSun size={16} />
      ) : (
        <IconMoonStars size={16} />
      )}
    </ActionIcon>
  );
}

export default LightModeButton;