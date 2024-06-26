import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_test/flutter_test.dart';

import '../test_utils/general_helper.dart';

void main() async {
  await ramTestHelper.initialize();

  group("Login input validation test", () {
    ramWidgetTest("Test leading/trailing whitespace",
        (tester, helper) async {
      await helper.loginHelper.waitForLoginScreen();
      await helper.loginHelper.acknowledgeNewServerVersion();

      await helper.loginHelper.enterCredentials(
        email: " demo@ram.app",
      );

      await tester.pump(const Duration(milliseconds: 300));

      expect(
        find.text("login_form_err_leading_whitespace".tr()),
        findsOneWidget,
      );

      await helper.loginHelper.enterCredentials(
        email: "demo@ram.app ",
      );

      await tester.pump(const Duration(milliseconds: 300));

      expect(
        find.text("login_form_err_trailing_whitespace".tr()),
        findsOneWidget,
      );
    });

    ramWidgetTest("Test invalid email", (tester, helper) async {
      await helper.loginHelper.waitForLoginScreen();
      await helper.loginHelper.acknowledgeNewServerVersion();

      await helper.loginHelper.enterCredentials(
        email: "demo.ram.app",
      );

      await tester.pump(const Duration(milliseconds: 300));

      expect(find.text("login_form_err_invalid_email".tr()), findsOneWidget);
    });
  });
}
