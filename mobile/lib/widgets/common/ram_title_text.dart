import 'package:flutter/material.dart';
import 'package:ram_mobile/extensions/build_context_extensions.dart';

class ramTitleText extends StatelessWidget {
  final double fontSize;
  final Color? color;

  const ramTitleText({
    super.key,
    this.fontSize = 48,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Image(
      image: AssetImage(
        context.isDarkTheme
            ? 'assets/ram-text-dark.png'
            : 'assets/ram-text-light.png',
      ),
      width: fontSize * 4,
      filterQuality: FilterQuality.high,
    );
  }
}
