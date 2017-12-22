package app.com.fragment;

import android.content.DialogInterface;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

import com.alibaba.fastjson.*;
import app.com.ConstantUtil;
import app.com.base.BaseFragment;
import app.com.httprequest.RequestThread;
import app.com.shopcar.R;
import butterknife.Bind;

/**
 * A placeholder fragment containing a simple view.
 */
/**
 *第一个页面
 * Created by Administrator on 2017/12/1.
 */

public class MainFragment extends BaseFragment {

    @Bind(R.id.wv_fmain_show)
    WebView pWebView;

    @Bind(R.id.btn_main_tocar)
    Button pButton;

    private String mdata ="";
    private Handler mHandler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            mdata = (String) msg.obj;
        }
    };
    private RequestThread mRequestThread=new RequestThread(mHandler);
    private Thread mThread= new Thread(mRequestThread);

    @Override
    protected int getContextLayoutId() {
        return R.layout.fragment_main;
    }

    @Override
    protected void initData() {

        mThread.start();
        try {
            mThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        pWebView.clearCache(true);

        WebSettings pWebSettings = pWebView.getSettings();
        // 设置webview支持js
        pWebSettings.setJavaScriptEnabled(true);
        // 设置本地调用对象及其接口
        pWebView.addJavascriptInterface(new JsInteraction(), "control");
        // 设置允许JS弹窗
        pWebSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        // 设置资源文件
        pWebView.loadUrl("file:///android_asset/ShopList.html",null);

        pWebView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                pWebView.post(new  Runnable() {

                    @Override
                    public void run() {
                        // 调用javascript的getData()方法
                        pWebView.loadUrl("javascript:getData()");
                        pButton.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                pWebView.loadUrl("javascript:check()");
                                Toast.makeText(getActivity(),"添加成功！",Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                });
            }
        });


        // 由于设置了弹窗检验调用结果,所以需要支持js对话框
        // webview只是载体，内容的渲染需要使用webviewChromClient类去实现
        // 通过设置WebChromeClient对象处理JavaScript的对话框
        // 设置响应js 的Alert()函数
        pWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {

                AlertDialog.Builder b = new AlertDialog.Builder(getActivity());
                b.setTitle("提示：");
                b.setMessage(message);
                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        result.confirm();
                    }
                });
                b.setCancelable(false);
                b.create().show();

                return true;
            }

        });

    }

    public class JsInteraction {
        @JavascriptInterface
        public void toData(String  message) {
            ConstantUtil.DATA = message;
        }
        @JavascriptInterface
        public String getArray(){
            return mdata;
        }
    }

}
