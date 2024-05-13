import 'package:ram_mobile/providers/album/current_album.provider.dart';
import 'package:ram_mobile/entities/album.entity.dart';
import 'package:mocktail/mocktail.dart';

class MockCurrentAlbumProvider extends CurrentAlbum
    with Mock
    implements CurrentAlbumInternal {
  Album? initAlbum;
  MockCurrentAlbumProvider([this.initAlbum]);

  @override
  Album? build() {
    return initAlbum;
  }
}
