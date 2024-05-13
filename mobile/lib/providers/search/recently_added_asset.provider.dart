import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/entities/asset.entity.dart';
import 'package:ram_mobile/providers/db.provider.dart';
import 'package:ram_mobile/providers/user.provider.dart';
import 'package:isar/isar.dart';

final recentlyAddedAssetProvider = FutureProvider<List<Asset>>((ref) async {
  final user = ref.read(currentUserProvider);
  if (user == null) return [];

  return ref
      .watch(dbProvider)
      .assets
      .where()
      .ownerIdEqualToAnyChecksum(user.isarId)
      .sortByFileCreatedAtDesc()
      .findAll();
});
