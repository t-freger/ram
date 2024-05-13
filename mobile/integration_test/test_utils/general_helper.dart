import 'dart:async';

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/entities/store.entity.dart';
import 'package:ram_mobile/providers/db.provider.dart';
import 'package:integration_test/integration_test.dart';
import 'package:isar/isar.dart';
// ignore: depend_on_referenced_packages
import 'package:meta/meta.dart';
import 'package:ram_mobile/main.dart' as app;

import 'login_helper.dart';

class ramTestHelper {
  final WidgetTester tester;

  ramTestHelper(this.tester);

  ramTestLoginHelper? _loginHelper;

  ramTestLoginHelper get loginHelper {
    _loginHelper ??= ramTestLoginHelper(tester);
    return _loginHelper!;
  }

  static Future<IntegrationTestWidgetsFlutterBinding> initialize() async {
    final binding = IntegrationTestWidgetsFlutterBinding.ensureInitialized();
    binding.framePolicy = LiveTestWidgetsFlutterBindingFramePolicy.fullyLive;

    // Load hive, localization...
    await app.initApp();

    return binding;
  }

  static Future<void> loadApp(WidgetTester tester) async {
    await EasyLocalization.ensureInitialized();
    // Clear all data from Isar (reuse existing instance if available)
    final db = Isar.getInstance() ?? await app.loadDb();
    await Store.clear();
    await db.writeTxn(() => db.clear());
    // Load main Widget
    await tester.pumpWidget(
      ProviderScope(
        overrides: [dbProvider.overrideWithValue(db)],
        child: const app.MainWidget(),
      ),
    );
    // Post run tasks
    await EasyLocalization.ensureInitialized();
  }
}

@isTest
void ramWidgetTest(
  String description,
  Future<void> Function(WidgetTester, ramTestHelper) test,
) {
  testWidgets(
    description,
    (widgetTester) async {
      await ramTestHelper.loadApp(widgetTester);
      await test(widgetTester, ramTestHelper(widgetTester));
    },
    semanticsEnabled: false,
  );
}

Future<void> pumpUntilFound(
  WidgetTester tester,
  Finder finder, {
  Duration timeout = const Duration(seconds: 120),
}) async {
  bool found = false;
  final timer =
      Timer(timeout, () => throw TimeoutException("Pump until has timed out"));
  while (found != true) {
    await tester.pump();
    found = tester.any(finder);
  }
  timer.cancel();
}
