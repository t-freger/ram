import 'package:flutter_test/flutter_test.dart';

import '../test_utils/general_helper.dart';
import '../test_utils/login_helper.dart';

void main() async {
  await ramTestHelper.initialize();

  group("Login tests", () {
    ramWidgetTest("Test correct credentials", (tester, helper) async {
      await helper.loginHelper.waitForLoginScreen();
      await helper.loginHelper.acknowledgeNewServerVersion();
      await helper.loginHelper.enterCredentialsOf(
        LoginCredentials.testInstance,
      );
      await helper.loginHelper.pressLoginButton();
      await helper.loginHelper.assertLoginSuccess();
    });

    ramWidgetTest("Test login with wrong password", (tester, helper) async {
      await helper.loginHelper.waitForLoginScreen();
      await helper.loginHelper.acknowledgeNewServerVersion();
      await helper.loginHelper.enterCredentialsOf(
        LoginCredentials.testInstanceButWithWrongPassword,
      );
      await helper.loginHelper.pressLoginButton();
      await helper.loginHelper.assertLoginFailed();
    });

    ramWidgetTest("Test login with wrong server URL",
        (tester, helper) async {
      await helper.loginHelper.waitForLoginScreen();
      await helper.loginHelper.acknowledgeNewServerVersion();
      await helper.loginHelper.enterCredentialsOf(
        LoginCredentials.wrongInstanceUrl,
      );
      await helper.loginHelper.pressLoginButton();
      await helper.loginHelper.assertLoginFailed();
    });
  });
}
