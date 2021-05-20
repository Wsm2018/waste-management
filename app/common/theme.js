export const colors = {
    TRANSPARENT: 'transparent',
    WHITE: '#FFFFFF',
    BLACK: '#000',
    GREEN: '#00A76F',
    LIGHTGRAY:'#F4F4F4',
    GRAY:'#D8D8D8',
    DARKGRAY: '#969696'
  }
  import ScheduleManagement from "./app/ScheduleManagement";
  const ScheduleManagementStack = createStackNavigator(
    {
      ScheduleManagement,
    },
    {
      headerMode: null,
    }
  );