import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/widgets/asset_grid/thumbnail_placeholder.dart';
import 'package:ram_mobile/providers/memory.provider.dart';
import 'package:ram_mobile/routing/router.dart';
import 'package:ram_mobile/providers/haptic_feedback.provider.dart';
import 'package:ram_mobile/widgets/common/ram_image.dart';

class MemoryLane extends HookConsumerWidget {
  const MemoryLane({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final memoryLaneFutureProvider = ref.watch(memoryFutureProvider);

    final memoryLane = memoryLaneFutureProvider
        .whenData(
          (memories) => memories != null
              ? SizedBox(
                  height: 200,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    shrinkWrap: true,
                    itemCount: memories.length,
                    padding: const EdgeInsets.only(
                      right: 8.0,
                      bottom: 8,
                      top: 10,
                      left: 10,
                    ),
                    itemBuilder: (context, index) {
                      final memory = memories[index];

                      return GestureDetector(
                        onTap: () {
                          ref
                              .read(hapticFeedbackProvider.notifier)
                              .heavyImpact();
                          context.pushRoute(
                            MemoryRoute(
                              memories: memories,
                              memoryIndex: index,
                            ),
                          );
                        },
                        child: Stack(
                          children: [
                            Card(
                              elevation: 3,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(13.0),
                              ),
                              clipBehavior: Clip.hardEdge,
                              child: ColorFiltered(
                                colorFilter: ColorFilter.mode(
                                  Colors.black.withOpacity(0.2),
                                  BlendMode.darken,
                                ),
                                child: Hero(
                                  tag: 'memory-${memory.assets[0].id}',
                                  child: ramImage(
                                    memory.assets[0],
                                    fit: BoxFit.cover,
                                    width: 130,
                                    height: 200,
                                    placeholder: const ThumbnailPlaceholder(
                                      width: 130,
                                      height: 200,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 16,
                              left: 16,
                              child: ConstrainedBox(
                                constraints: const BoxConstraints(
                                  maxWidth: 114,
                                ),
                                child: Text(
                                  memory.title,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                    color: Colors.white,
                                    fontSize: 15,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                )
              : const SizedBox(),
        )
        .value;

    return memoryLane ?? const SizedBox();
  }
}
