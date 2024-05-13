import 'package:ram_mobile/services/map.service.dart';
import 'package:ram_mobile/providers/api.provider.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'map_service.provider.g.dart';

@riverpod
MapSerivce mapService(MapServiceRef ref) =>
    MapSerivce(ref.watch(apiServiceProvider));
