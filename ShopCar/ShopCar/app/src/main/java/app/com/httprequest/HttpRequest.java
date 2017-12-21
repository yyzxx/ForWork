package app.com.httprequest;

import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

/**
 * @author : Administrator
 * @e-mail : xxx@xx
 * @time : 2017/12/19
 * @desc :
 */

public class HttpRequest {


    private static String mdata;
    //private static RequestThread mRequestThread=new RequestThread(mHandler);


    public static String run() {
//        FutureTask<String> task = new FutureTask<String>(
//                new Callable<String>() {
//                    @Override
//                    public String call() throws Exception {
//                        Request request = new Request.Builder().url("https://api.douban.com/v2/book/search?q=编程艺术").build();
//                        Response response = pOkHttpClient.newCall(request).execute();
//                        if (response.isSuccessful()) {
//                            return response.body().string();
//                        } else {
//                            return "connect err!";
//                        }
//                    }
//
//                });
//        new Thread(task).start();
//        return task.get();
        Log.e("<>---<> ",mdata);
        return mdata;
    }
}