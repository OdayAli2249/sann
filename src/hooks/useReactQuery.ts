import { APIResponse, QueryObject } from "@/types/customTypes";
import { filterQueryObject, transformFirstLetterToUppercase } from "@/utils/helpers";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import useAxios from "./useAxios";
import { apiConfig } from "@/api/config";
import { useAlert } from "@/context/alerts";
import { getAlertMessage } from "@/api/constants/apiMessages";
import { useTranslation } from "@/translation";

interface UseReactQueryOptions<R = any> {
    key?: string;
    url: string;
    page?: number | undefined;
    query?: QueryObject;
    onSuccess?: (data: APIResponse<R>) => void;
    onError?: (error: any) => void;
    method?: Method;
    enabled?: boolean;
    dto?: (data: any) => any;
    baseUrl?: string;
    headers?: AxiosHeaders | Partial<RawAxiosRequestHeaders>;
}

const useReactQuery = <R = any>({
    key,
    url,
    query = {},
    headers,
    onSuccess,
    onError,
    method = "GET",
    enabled = true,
    baseUrl,
}: UseReactQueryOptions<R>): UseMutationResult &
    UseQueryResult<APIResponse<R>, AxiosError<APIResponse>> => {
    const axios = useAxios();
    const alert = useAlert();
    const { t } = useTranslation();

    const fetcher = async <R = any>(data: any, query: QueryObject) => {
        const res = await axios.request<APIResponse<R>>({
            baseURL: baseUrl ?? apiConfig.apiBaseUrl,
            url,
            method,
            data,
            headers,
            params: filterQueryObject(query),
        });

        return res.data;
    };

    return method === "GET"
        ? (useQuery<APIResponse<R>, AxiosError<APIResponse>>({
            queryKey: [key, filterQueryObject(query)],
            queryFn: () => fetcher(undefined, query),
            onError,
            onSuccess,
            enabled,
        }) as UseMutationResult<APIResponse<R>, AxiosError<APIResponse>> &
            UseQueryResult<APIResponse<R>, AxiosError<APIResponse>>)
        : (useMutation([key], (data) => fetcher<R>(data, query), {
            onError: (error: AxiosError<APIResponse>) => {
                onError?.(error);
                alert(
                    error?.response?.data.errors ?
                        transformFirstLetterToUppercase(
                            (Object.values(error?.response?.data.errors).flat().join('-') as string)
                            ?? error?.response?.data.message ?? t("Something wrong happened!")
                        ) : transformFirstLetterToUppercase(t("Something wrong happened!")),
                    "error",
                    t("Failed")
                );
            },
            onSuccess: (data) => {
                alert(getAlertMessage("Resource", "success", method), "success");
                onSuccess?.(data);
            },
        }) as UseMutationResult<APIResponse<R>, AxiosError<APIResponse>> &
            UseQueryResult<APIResponse<R>, AxiosError<APIResponse>>);
};

export default useReactQuery;
