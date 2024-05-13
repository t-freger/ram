import 'package:auto_route/auto_route.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:ram_mobile/extensions/asyncvalue_extensions.dart';
import 'package:ram_mobile/widgets/asset_grid/ram_asset_grid.dart';
import 'package:ram_mobile/providers/search/recently_added_asset.provider.dart';

@RoutePage()
class RecentlyAddedPage extends HookConsumerWidget {
  const RecentlyAddedPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final recents = ref.watch(recentlyAddedAssetProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('recently_added_page_title').tr(),
        leading: IconButton(
          onPressed: () => context.popRoute(),
          icon: const Icon(Icons.arrow_back_ios_rounded),
        ),
      ),
      body: recents.widgetWhen(
        onData: (searchResponse) => ramAssetGrid(
          assets: searchResponse,
        ),
      ),
    );
  }
}
