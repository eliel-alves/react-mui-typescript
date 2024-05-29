import { Api } from '../axios-config';
import { Environment } from '../../../environment';

export interface IUserList {
  id: string;
  fullName: string;
  email: string;
  cityId: string;
}

export interface IUserDetail {
  id: string;
  fullName: string;
  email: string;
  cityId: string;
}

type TUserTotalCount = {
  data: IUserList[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TUserTotalCount | Error> => {
  try {
    const relativeUrl = `/users?_page=${page}&_limit=${Environment.LINES_LIMIT}&fullName_like=${filter}`;

    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINES_LIMIT),
      };
    }

    return new Error('Error on list data');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error on list data');
  }
};

const getById = async (id: string): Promise<IUserDetail | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`);

    if (data) return data;

    return new Error('Error when query data');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error when query data');
  }
};

const create = async (userData: Omit<IUserDetail, 'id'>): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IUserDetail>('/users', userData);

    if (data) return data.id;

    return new Error('Error creating record');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error creating record');
  }
};

const updateById = async (id: string, userData: IUserDetail): Promise<void | Error> => {
  try {
    await Api.put(`/users/${id}`, userData);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error updating record');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/users/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error deleting record');
  }
};

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
