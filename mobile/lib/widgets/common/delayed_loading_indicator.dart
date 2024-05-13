import 'package:flutter/material.dart';
import 'package:ram_mobile/widgets/common/ram_loading_indicator.dart';

class DelayedLoadingIndicator extends StatelessWidget {
  /// The delay to avoid showing the loading indicator
  final Duration delay;

  /// Defaults to using the [ramLoadingIndicator]
  final Widget? child;

  /// An optional fade in duration to animate the loading
  final Duration? fadeInDuration;

  const DelayedLoadingIndicator({
    super.key,
    this.delay = const Duration(seconds: 3),
    this.child,
    this.fadeInDuration,
  });

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Future.delayed(delay),
      builder: (context, snapshot) {
        late Widget c;
        if (snapshot.connectionState == ConnectionState.done) {
          c = child ??
              const ramLoadingIndicator(
                key: ValueKey('loading'),
              );
        } else {
          c = Container(key: const ValueKey('hiding'));
        }

        return AnimatedSwitcher(
          duration: fadeInDuration ?? Duration.zero,
          child: c,
        );
      },
    );
  }
}
