import os
import h5py
import numpy as np
import pandas as pd


def data_pull(path, source):
    with h5py.File(path, 'r') as f:
        data = f[source]
        temp_data = {d: data[d][...] for d in data.keys()}
        df = pd.DataFrame(temp_data)
        df = df.drop_duplicates('name', keep="first")
        # df = clean_df(df)
    return df


def clean_df(df):
    clean_df = df.replace(r'\s+', np.nan, regex=True).replace('', np.nan)
    clean_df = clean_df[clean_df['name'].notnull()]
    clean_df = clean_df[clean_df['global_sales'].notnull()]
    clean_df = clean_df[clean_df['critic_score'].notnull()]
    # clean_df = df.fillna() 
    return clean_df
