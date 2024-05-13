import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/services/oauth.service.dart';
import 'package:ram_mobile/providers/api.provider.dart';

final oAuthServiceProvider =
    Provider((ref) => OAuthService(ref.watch(apiServiceProvider)));
