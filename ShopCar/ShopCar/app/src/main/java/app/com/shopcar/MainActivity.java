package app.com.shopcar;

import android.graphics.Color;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import app.com.ConstantUtil;
import app.com.adapt.FragmentAdapt;
import app.com.fragment.FollowFragment;


public class MainActivity extends AppCompatActivity {


    private FragmentAdapt mFragmentAdapt;

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;
    private TabLayout.Tab mMenuIndex;
    private TabLayout.Tab mMenuGps;
    private TabLayout mTabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        mFragmentAdapt = new FragmentAdapt(mViewPager,this,this.getSupportFragmentManager(),
                ConstantUtil.MENU_TITLE,ConstantUtil.MENU_ICON,getSupportFragmentManager().beginTransaction());

        // 设置ViewPager适配器.
        mViewPager = (ViewPager) findViewById(R.id.Vp_main_container);
        mViewPager.setAdapter(mFragmentAdapt);
        mViewPager.setOffscreenPageLimit(0);

        mTabLayout = (TabLayout) findViewById(R.id.tabs_main_choose);
        mTabLayout.setupWithViewPager(mViewPager);
        mTabLayout.setTabMode(TabLayout.MODE_FIXED);
        mTabLayout.setTabGravity(TabLayout.GRAVITY_FILL);
        mTabLayout.setTabTextColors(Color.BLACK, Color.RED);


        mMenuIndex = mTabLayout.getTabAt(0);
        mMenuGps = mTabLayout.getTabAt(1);
        mMenuIndex.setIcon(getResources().getDrawable(ConstantUtil.MENU_ICON[0]));
        mMenuGps.setIcon(getResources().getDrawable(ConstantUtil.MENU_ICON[1]));

        // 列表点击搜索事件
        mTabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                //tab选中
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                //tab未选中
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
                //tab重新选中
            }
        });

    }
    public TabLayout getmTabLayout(){
        return mTabLayout;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


}
