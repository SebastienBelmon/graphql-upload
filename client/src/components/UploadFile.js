import React from 'react';
import { Mutation } from 'react-apollo';

import { UPLOADFILE_MUTATION } from '../mutations/fileMutations';

class UploadFile extends React.Component {
  async handleChange(e, singleUpload) {
    const { files } = e.target;

    console.log(files[0]);

    await singleUpload({
      variables: {
        filename: files[0].name,
        file: files[0],
      },
    });
  }

  render() {
    return (
      <Mutation mutation={UPLOADFILE_MUTATION}>
        {singleUpload => (
          <React.Fragment>
            <input
              type="file"
              onChange={e => this.handleChange(e, singleUpload)}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default UploadFile;
