import 'package:ram_mobile/widgets/asset_grid/asset_grid_data_structure.dart';
import 'package:ram_mobile/services/person.service.dart';
import 'package:ram_mobile/providers/app_settings.provider.dart';
import 'package:ram_mobile/services/app_settings.service.dart';
import 'package:openapi/api.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'people.provider.g.dart';

@riverpod
Future<List<PersonResponseDto>> getAllPeople(
  GetAllPeopleRef ref,
) async {
  final PersonService personService = ref.read(personServiceProvider);

  final people = await personService.getAllPeople();

  return people;
}

@riverpod
Future<RenderList> personAssets(PersonAssetsRef ref, String personId) async {
  final PersonService personService = ref.read(personServiceProvider);
  final assets = await personService.getPersonAssets(personId);
  if (assets == null) {
    return RenderList.empty();
  }

  final settings = ref.read(appSettingsServiceProvider);
  final groupBy =
      GroupAssetsBy.values[settings.getSetting(AppSettingsEnum.groupAssetsBy)];
  return await RenderList.fromAssets(assets, groupBy);
}

@riverpod
Future<bool> updatePersonName(
  UpdatePersonNameRef ref,
  String personId,
  String updatedName,
) async {
  final PersonService personService = ref.read(personServiceProvider);
  final person = await personService.updateName(personId, updatedName);

  if (person != null && person.name == updatedName) {
    ref.invalidate(getAllPeopleProvider);
    return true;
  }
  return false;
}
