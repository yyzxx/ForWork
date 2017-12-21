package app.com.base;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import butterknife.ButterKnife;

/**
 * @author : yzx
 * @e-mail : xxx@xx
 * @time : 2017/12/04
 * @desc : 父类fragment，用于继承实现
 */

public abstract class BaseFragment extends Fragment {

    @SuppressLint("JavascriptInterface")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        //设置布局文件
        int layId = getContextLayoutId();
        //获取界面
        View root = inflater.inflate(layId, container, false);
        //初始化控件
        initWidget(root);
        // 当View创建完成后初始化数据
        initData();
        return root;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    /**
     * 获取界面的id
     * @return 资源文件Id
     */
    protected abstract int getContextLayoutId();

    /**
     * 初始化控件
     */
    protected void initWidget(View root){
        //绑定注解
        ButterKnife.bind(this,root);
    }

    /**
     * 初始化数据
     */
    protected void initData(){

    }


}
