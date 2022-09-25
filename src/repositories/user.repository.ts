import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {File, User, UserRelations} from '../models';
import {FileRepository} from './file.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly files: HasManyRepositoryFactory<File, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(User, dataSource);
    this.files = this.createHasManyRepositoryFactoryFor('files', fileRepositoryGetter,);
    this.registerInclusionResolver('files', this.files.inclusionResolver);
  }
}
