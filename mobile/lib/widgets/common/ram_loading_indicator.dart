import 'package:flutter/material.dart';
import 'package:ram_mobile/extensions/build_context_extensions.dart';

class ramLoadingIndicator extends StatelessWidget {
  final double? borderRadius;

  const ramLoadingIndicator({
    super.key,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        color: context.primaryColor.withAlpha(200),
        borderRadius: BorderRadius.circular(borderRadius ?? 10),
      ),
      padding: const EdgeInsets.all(15),
      child: const CircularProgressIndicator(
        color: Colors.white,
        strokeWidth: 3,
      ),
    );
  }
}
