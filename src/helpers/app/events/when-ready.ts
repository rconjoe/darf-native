import {
  createMainWindow,
  createSplashScreen,
  updateSplashScreenStatus,
} from "../window-management";

export default async function whenReady() {
  await createSplashScreen();
  // busted, see definition:
  updateSplashScreenStatus("check this shit out");
  setTimeout(() => {
    createMainWindow();
  }, 5000);
}
