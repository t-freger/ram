import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'ram_logo_provider.g.dart';

@riverpod
Future<Uint8List> ramLogo(ramLogoRef ref) async {
  final json = await rootBundle.loadString('assets/ram-logo.json');
  final j = jsonDecode(json);
  return base64Decode(j['content']);
}
