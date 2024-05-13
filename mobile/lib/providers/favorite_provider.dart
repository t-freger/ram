import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/widgets/asset_grid/asset_grid_data_structure.dart';
import 'package:ram_mobile/entities/asset.entity.dart';
import 'package:ram_mobile/providers/db.provider.dart';
import 'package:ram_mobile/providers/user.provider.dart';
import 'package:ram_mobile/utils/renderlist_generator.dart';
import 'package:isar/isar.dart';

final favoriteAssetsProvider = StreamProvider<RenderList>((ref) {
  final user = ref.watch(currentUserProvider);
  if (user == null) return const Stream.empty();
  final query = ref
      .watch(dbProvider)
      .assets
      .where()
      .ownerIdEqualToAnyChecksum(user.isarId)
      .filter()
      .isFavoriteEqualTo(true)
      .isTrashedEqualTo(false)
      .sortByFileCreatedAtDesc();
  return renderListGenerator(query, ref);
});
