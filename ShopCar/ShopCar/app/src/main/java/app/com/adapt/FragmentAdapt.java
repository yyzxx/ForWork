package app.com.adapt;

import android.content.Context;
import android.graphics.drawable.Drawable;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.ImageSpan;
import android.util.Log;


import app.com.ConstantUtil;
import app.com.fragment.FollowFragment;
import app.com.fragment.MainFragment;

/**
 * Created by Administrator on 2017/12/1.
 */

public class FragmentAdapt extends FragmentPagerAdapter {

    String[] pageTitle;
    int[] pageIcon;
    Context context;
    FragmentTransaction transaction;
    Fragment indexfragment,followFragment;
    ViewPager view;
    Fragment fragment = null;

    public FragmentAdapt(ViewPager view, Context context, FragmentManager fm, String[] pageTitle, int[] pageIcon, FragmentTransaction transaction) {
        super(fm);
        this.view = view;
        this.transaction = transaction;
        this.context = context;
        this.pageTitle = pageTitle;
        this.pageIcon = pageIcon;
    }

    @Override
    public Fragment getItem(int position) {
        Log.e("------>fragment",""+position);
        return getfragment(position);
    }

    public Fragment getfragment(int position){


        switch (position) {
            case 0:

                if (indexfragment == null){
                    indexfragment = new MainFragment();
                }
                fragment = indexfragment;

            break;

            case 1:

//                if (followFragment == null){
                    followFragment = new FollowFragment();
//                }
                fragment = followFragment;

            break;

        }

        return fragment;
    }
    public Fragment getFollowFragment(){
        return fragment;
    }

    @Override
    public int getCount() {
        return pageTitle.length;
    }

    /**
     * 获取title
     * @param position
     * @return
     */
    @Override
    public CharSequence getPageTitle(int position) {
        Drawable image = context.getResources().getDrawable(pageIcon[position]);
        image.setBounds(0, 0, image.getIntrinsicWidth(), image.getIntrinsicHeight());
        SpannableString sb = new SpannableString(pageTitle[position]+" ");
        ImageSpan imageSpan = new ImageSpan(image, ImageSpan.ALIGN_BOTTOM);
        sb.setSpan(imageSpan, pageTitle[position].length(), pageTitle[position].length() + 1, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return ConstantUtil.MENU_TITLE[position];
    }

}
