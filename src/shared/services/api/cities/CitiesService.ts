import { Api } from '../axios-config';
import { Environment } from '../../../environment';

export interface ICityList {
  id: string;
  name: string;
}

export interface ICityDetail {
  id: string;
  name: string;
}

type TCityTotalCount = {
  data: ICityList[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCityTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LINES_LIMIT}&name_like=${filter}`;

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

const getById = async (id: string): Promise<ICityDetail | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

    if (data) return data;

    return new Error('Error when query data');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error when query data');
  }
};

const create = async (cityData: Omit<ICityDetail, 'id'>): Promise<string | Error> => {
  try {
    const { data } = await Api.post<ICityDetail>('/cities', cityData);

    if (data) return data.id;

    return new Error('Error creating record');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error creating record');
  }
};

const updateById = async (id: string, cityData: ICityDetail): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, cityData);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error updating record');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error deleting record');
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
