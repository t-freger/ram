import 'dart:async';
import 'dart:ui' as ui;

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:ram_mobile/providers/image/cache/image_loader.dart';
import 'package:ram_mobile/providers/image/cache/thumbnail_image_cache_manager.dart';
import 'package:openapi/api.dart' as api;

import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';
import 'package:ram_mobile/entities/asset.entity.dart';
import 'package:ram_mobile/utils/image_url_builder.dart';

/// The remote image provider
class ramRemoteThumbnailProvider
    extends ImageProvider<ramRemoteThumbnailProvider> {
  /// The [Asset.remoteId] of the asset to fetch
  final String assetId;

  final int? height;
  final int? width;

  /// The image cache manager
  final CacheManager? cacheManager;

  ramRemoteThumbnailProvider({
    required this.assetId,
    this.height,
    this.width,
    this.cacheManager,
  });

  /// Converts an [ImageProvider]'s settings plus an [ImageConfiguration] to a key
  /// that describes the precise image to load.
  @override
  Future<ramRemoteThumbnailProvider> obtainKey(
    ImageConfiguration configuration,
  ) {
    return SynchronousFuture(this);
  }

  @override
  ImageStreamCompleter loadImage(
    ramRemoteThumbnailProvider key,
    ImageDecoderCallback decode,
  ) {
    final cache = cacheManager ?? ThumbnailImageCacheManager();
    return MultiImageStreamCompleter(
      codec: _codec(key, cache, decode),
      scale: 1.0,
    );
  }

  // Streams in each stage of the image as we ask for it
  Stream<ui.Codec> _codec(
    ramRemoteThumbnailProvider key,
    CacheManager cache,
    ImageDecoderCallback decode,
  ) async* {
    // Load a preview to the chunk events
    final preview = getThumbnailUrlForRemoteId(
      key.assetId,
      type: api.ThumbnailFormat.WEBP,
    );

    yield await ImageLoader.loadImageFromCache(
      preview,
      cache: cache,
      decode: decode,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other is ramRemoteThumbnailProvider) {
      return assetId == other.assetId;
    }

    return false;
  }

  @override
  int get hashCode => assetId.hashCode;
}
