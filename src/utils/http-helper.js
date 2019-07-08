import axios from 'axios';
import User from './user';

const { signOut } = new User();

class HttpHelper {
  sendRequest = async (args) => {
    try {
      const response = await axios(args);

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        signOut();
      }

      return {
        error,
        status: error.response.status,
      };
    }
  };

  getRequest = async (args) => {
    const {
      data, error, status,
    } = await this.sendRequest({
      ...args,
      method: 'get',
    });

    if (status === 200) {
      return {
        data,
        error: null,
        status,
      };
    }

    return {
      data,
      error: error || data,
      status,
    };
  };

  postRequest = async (args) => {
    const {
      data, error, status,
    } = await this.sendRequest({
      ...args,
      method: 'post',
    });

    if ([200, 201, 204].indexOf(status) > -1) {
      return {
        data,
        error: null,
        status,
      };
    }

    return {
      data: null,
      error: error || data,
      status,
    };
  };

  patchRequest = async (args) => {
    const {
      data, error, status,
    } = await this.sendRequest({
      ...args,
      method: 'patch',
    });

    if (status === 200) {
      return {
        data,
        error: null,
        status,
      };
    }

    return {
      data: null,
      error: error || data,
      status,
    };
  };

  putRequest = async (args) => {
    const {
      data, error, status,
    } = await this.sendRequest({
      ...args,
      method: 'put',
    });

    if (status === 204) {
      return {
        data,
        error: null,
        status,
      };
    }

    return {
      data: null,
      error: error || data,
      status,
    };
  };

  deleteRequest = async (args) => {
    const {
      data, error, status,
    } = await this.sendRequest({
      ...args,
      method: 'delete',
    });

    if (status === 204) {
      return {
        data,
        error: null,
        status,
      };
    }

    return {
      data: null,
      error: error || data,
      status,
    };
  };
}

export default HttpHelper;
