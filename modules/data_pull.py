import os
import h5py
import numpy as np
import pandas as pd


def data_pull(path, source):
    with h5py.File(path, 'r') as f:
        data = f[source]
        temp_data = {d: data[d][...] for d in data.keys()}
        df = pd.DataFrame(temp_data)
        # df = df.drop_duplicates('name', keep="first")
    return df


def clean_df(df):
    clean_df = df
    return clean_df


def group_by_name(df):
    temp_df = df
    cols = temp_df.columns.drop('name')
    temp_df[cols] = temp_df[cols].apply(pd.to_numeric, errors="coerce")
        
    groupby_name_df = (
        temp_df
        .groupby(['name'])
        .agg({
            'global_sales': ['sum'],
            'critic_score': ['mean'],
            'user_score': ['mean']
        })
    )
    return groupby_name_df
