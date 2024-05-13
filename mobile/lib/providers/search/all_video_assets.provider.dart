import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/widgets/asset_grid/asset_grid_data_structure.dart';
import 'package:ram_mobile/entities/asset.entity.dart';
import 'package:ram_mobile/providers/db.provider.dart';
import 'package:ram_mobile/utils/renderlist_generator.dart';

final allVideoAssetsProvider = StreamProvider<RenderList>((ref) {
  final query = ref
      .watch(dbProvider)
      .assets
      .filter()
      .isArchivedEqualTo(false)
      .isTrashedEqualTo(false)
      .typeEqualTo(AssetType.video)
      .sortByFileCreatedAtDesc();
  return renderListGenerator(query, ref);
});
