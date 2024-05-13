import 'package:ram_mobile/services/activity.service.dart';
import 'package:ram_mobile/providers/api.provider.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'activity_service.provider.g.dart';

@riverpod
ActivityService activityService(ActivityServiceRef ref) =>
    ActivityService(ref.watch(apiServiceProvider));
