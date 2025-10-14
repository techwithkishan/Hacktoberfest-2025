# --- Section 1: Importing modules ---
# These modules are essential for time series analysis, decomposition, forecasting, and anomaly detection.
import pandas as pd  # for data manipulation
import numpy as np  # for numerical operations
import matplotlib.pyplot as plt  # for visualization
from statsmodels.datasets import sunspots  # built-in time series dataset
from statsmodels.tsa.seasonal import seasonal_decompose  # for decomposition
from statsmodels.tsa.arima.model import ARIMA  # for forecasting
from scipy.stats import zscore  # for anomaly detection

# --- Section 2: Loading the dataset ---
print("Loading the Sunspots dataset...")
data = sunspots.load_pandas().data
data['YEAR'] = pd.to_datetime(data['YEAR'], format='%Y')
data.set_index('YEAR', inplace=True)
ts = data['SUNACTIVITY']
print(f"Dataset loaded successfully with {ts.shape[0]} records.\n")

# --- Section 3: Decomposing the time series ---
print("Performing time series decomposition...")
decomposition = seasonal_decompose(
    ts, model='additive', period=11)
decomposition.plot()
plt.suptitle("Time Series Decomposition")
plt.show()
print("Decomposition completed.\n")

# --- Section 4: Forecasting future values ---
print("Forecasting future values using ARIMA...")
model = ARIMA(ts, order=(2, 1, 2))
model_fit = model.fit()
forecast = model_fit.forecast(steps=10)
print("Forecasted values for the next 10 years:")
print(forecast)

plt.figure(figsize=(10, 5))
plt.plot(ts, label='Historical')
plt.plot(pd.date_range(ts.index[-1]+pd.offsets.YearBegin(),
         periods=10, freq='YE'), forecast, color='red', label='Forecast')
plt.legend()
plt.title("ARIMA Forecast")
plt.show()
print("Forecasting completed.\n")

# --- Section 5: Anomaly detection ---
print("Performing anomaly detection using z-score...")
z_scores = zscore(ts)
anomalies = ts[np.abs(z_scores) > 2]
print("Detected anomalies:")
print(anomalies)

plt.figure(figsize=(10, 5))
plt.plot(ts, label='Time Series')
plt.scatter(anomalies.index, anomalies.values,
            color='red', marker='o', label='Anomaly')
plt.legend()
plt.title("Anomaly Detection")
plt.show()
print("Anomaly detection completed.\n")
