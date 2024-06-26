import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/entities/exif_info.entity.dart';
import 'package:ram_mobile/providers/api.provider.dart';
import 'package:ram_mobile/providers/db.provider.dart';
import 'package:ram_mobile/services/api.service.dart';
import 'package:isar/isar.dart';
import 'package:openapi/api.dart';

class AssetDescriptionService {
  AssetDescriptionService(this._db, this._api);

  final Isar _db;
  final ApiService _api;

  setDescription(
    String description,
    String remoteAssetId,
    int localExifId,
  ) async {
    final result = await _api.assetApi.updateAsset(
      remoteAssetId,
      UpdateAssetDto(description: description),
    );

    if (result?.exifInfo?.description != null) {
      var exifInfo = await _db.exifInfos.get(localExifId);

      if (exifInfo != null) {
        exifInfo.description = result!.exifInfo!.description;
        await _db.writeTxn(
          () => _db.exifInfos.put(exifInfo),
        );
      }
    }
  }

  Future<String> readLatest(String assetRemoteId, int localExifId) async {
    final latestAssetFromServer =
        await _api.assetApi.getAssetInfo(assetRemoteId);
    final localExifInfo = await _db.exifInfos.get(localExifId);

    if (latestAssetFromServer != null && localExifInfo != null) {
      localExifInfo.description =
          latestAssetFromServer.exifInfo?.description ?? '';

      await _db.writeTxn(
        () => _db.exifInfos.put(localExifInfo),
      );

      return localExifInfo.description!;
    }

    return "";
  }
}

final assetDescriptionServiceProvider = Provider(
  (ref) => AssetDescriptionService(
    ref.watch(dbProvider),
    ref.watch(apiServiceProvider),
  ),
);
