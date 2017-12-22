package app.com.fragment;

import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import app.com.ConstantUtil;
import app.com.base.BaseFragment;
import app.com.shopcar.R;
import butterknife.Bind;

/**
 * A placeholder fragment containing a simple view.
 */

/**
 *第一个页面
 * Created by Administrator on 2017/12/1.
 */

public class FollowFragment extends BaseFragment {

    @Bind(R.id.wv_fmain_show)
    WebView pWebView;

    @Override
    protected int getContextLayoutId() {
        return R.layout.fragment_main;
    }

    @Override
    protected void initWidget(View root) {
        super.initWidget(root);
    }

    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        postData();
    }


    protected void initDatas() {

        pWebView.clearCache(true);
        WebSettings pWebSettings = pWebView.getSettings();
        // 设置webview支持js
        pWebSettings.setJavaScriptEnabled(true);
        // 给js调用的方式
        pWebView.addJavascriptInterface(new FollowFragment.JsInteraction(), "control");
        // 设置允许JS弹窗
        pWebSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        pWebView.loadUrl("file:///android_asset/ShopCar.html",null);

        pWebView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                pWebView.post(new  Runnable() {
                    @Override
                    public void run() {
                        pWebView.loadUrl("javascript:gets()");
                    }
                });
            }
        });

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

    public void postData(){
        if (getUserVisibleHint()) {
            if(ConstantUtil.DATA!=null){
                initDatas();
            }

        }

    }
    public class JsInteraction {

        // 传递数据给js
        @JavascriptInterface
        public String getArray(){
            return ConstantUtil.DATA;
        }
        // js传递修改数据
        @JavascriptInterface
        public void setData(String data){
            ConstantUtil.DATA = data;
        }
    }

}
