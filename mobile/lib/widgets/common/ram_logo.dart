import 'package:flutter/material.dart';

class ramLogo extends StatelessWidget {
  final double size;
  final dynamic heroTag;

  const ramLogo({
    super.key,
    this.size = 100,
    this.heroTag,
  });

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: heroTag,
      child: Image(
        image: const AssetImage('assets/ram-logo.png'),
        width: size,
        filterQuality: FilterQuality.high,
        isAntiAlias: true,
      ),
    );
  }
}
