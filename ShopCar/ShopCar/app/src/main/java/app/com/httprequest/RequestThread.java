package app.com.httprequest;

import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

/**
 * @author : Administrator
 * @e-mail : xxx@xx
 * @time : 2017/12/19
 * @desc :
 */

public class RequestThread implements Runnable {

    private Handler mHandler;
    public static OkHttpClient pOkHttpClient = new OkHttpClient();



    public  RequestThread (Handler h){
        this.mHandler = h;
    }

    @Override
    public void run() {
        Request request = new Request.Builder()
                .url("https://api.douban.com/v2/book/search?q=编程艺术")
                .build();
        Response response = null;
//        Message msg = mHandler.obtainMessage();
//        pOkHttpClient.newCall(request).enqueue(new Callback() {
//
//
//            @Override
//            public void onFailure(Request request, IOException e) {
//
//            }
//            Message msg = mHandler.obtainMessage();
//            @Override public void onResponse(Response response) throws IOException {
//                if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
//
//                Headers responseHeaders = response.headers();
//                for (int i = 0; i < responseHeaders.size(); i++) {
//                    System.out.println(responseHeaders.name(i) + ": " + responseHeaders.value(i));
//                }
//                msg.obj = response.body().string();
//                System.out.println(response.body().string());
//            }
//        });
        try {
            response = pOkHttpClient.newCall(request).execute();

            Message msg = mHandler.obtainMessage();
            if (response.isSuccessful()) {
                msg.obj = response.body().string();
            } else {
                msg.obj =  "connect err!";
            }
            Log.e("=================",response.body().string());
            mHandler.sendMessage(msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
