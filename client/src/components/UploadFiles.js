import React from 'react';
import { Mutation } from 'react-apollo';

import { MULTIPLEUPLOADFILES_MUTATION } from '../mutations/fileMutations';

class UploadFile extends React.Component {
  async handleChange(e, multipleUpload) {
    const { files } = e.target;

    let names = [];
    Object.keys(files).forEach(file => {
      names.push(files[file].name);
    });

    console.log(names);

    await multipleUpload({
      variables: {
        names,
        files,
      },
    });
  }

  render() {
    return (
      <Mutation mutation={MULTIPLEUPLOADFILES_MUTATION}>
        {multipleUpload => (
          <React.Fragment>
            <input
              type="file"
              onChange={e => this.handleChange(e, multipleUpload)}
              multiple
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default UploadFile;
