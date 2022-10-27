import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

function LightModeButton(props) {

const {toggleColorScheme, mode} = props;
  //const { colorScheme } = useMantineColorScheme();
  //const dark = colorScheme === 'dark';
  
  let icon = false;

  if (mode == "dark") {
    icon = false;
  } else {
    icon = true;
  }


  return (
    <ActionIcon
      variant="outline"
      color={icon ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {icon ? <IconSun size={18} /> : <IconMoonStars size={18} />}

    </ActionIcon>
  );
}

export default LightModeButton;