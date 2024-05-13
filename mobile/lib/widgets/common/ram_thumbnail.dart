import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:ram_mobile/providers/image/ram_local_thumbnail_provider.dart';
import 'package:ram_mobile/providers/image/ram_remote_thumbnail_provider.dart';
import 'package:ram_mobile/entities/asset.entity.dart';
import 'package:ram_mobile/utils/hooks/blurhash_hook.dart';
import 'package:ram_mobile/widgets/common/ram_image.dart';
import 'package:ram_mobile/widgets/common/thumbhash_placeholder.dart';
import 'package:octo_image/octo_image.dart';

class ramThumbnail extends HookWidget {
  const ramThumbnail({
    this.asset,
    this.width = 250,
    this.height = 250,
    this.fit = BoxFit.cover,
    super.key,
  });

  final Asset? asset;
  final double width;
  final double height;
  final BoxFit fit;

  /// Helper function to return the image provider for the asset thumbnail
  /// either by using the asset ID or the asset itself
  /// [asset] is the Asset to request, or else use [assetId] to get a remote
  /// image provider
  static ImageProvider imageProvider({
    Asset? asset,
    String? assetId,
    int thumbnailSize = 256,
  }) {
    if (asset == null && assetId == null) {
      throw Exception('Must supply either asset or assetId');
    }

    if (asset == null) {
      return ramRemoteThumbnailProvider(
        assetId: assetId!,
      );
    }

    if (ramImage.useLocal(asset)) {
      return ramLocalThumbnailProvider(
        asset: asset,
        height: thumbnailSize,
        width: thumbnailSize,
      );
    } else {
      return ramRemoteThumbnailProvider(
        assetId: asset.remoteId!,
        height: thumbnailSize,
        width: thumbnailSize,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    Uint8List? blurhash = useBlurHashRef(asset).value;
    if (asset == null) {
      return Container(
        color: Colors.grey,
        width: width,
        height: height,
        child: const Center(
          child: Icon(Icons.no_photography),
        ),
      );
    }

    return OctoImage.fromSet(
      placeholderFadeInDuration: Duration.zero,
      fadeInDuration: Duration.zero,
      fadeOutDuration: const Duration(milliseconds: 100),
      octoSet: blurHashOrPlaceholder(blurhash),
      image: ramThumbnail.imageProvider(
        asset: asset,
      ),
      width: width,
      height: height,
      fit: fit,
    );
  }
}
