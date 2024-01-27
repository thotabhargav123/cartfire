#include <bits/stdc++.h>
using namespace std;
vector<string> StringP(int t, vector<string> a, vector<string> b)
{
    vector<string> ans;
    int n = a.size();

    for (int j = 0; j < n; j++)
    {
        unordered_map<char, int> ump1, ump2;

        if (a[j].size() != b[j].size())
        {
            ans.push_back("NO");
            continue;
        }

        for (int i = 0; i < a[j].size(); i++)
        {
            ump1[a[j][i]]++;
        }

        for (int i = 0; i < b[j].size(); i++)
        {
            ump2[b[j][i]]++;
        }

        bool isPossible = true;

        for (auto c : ump1)
        {
            char cc = c.first;

            if (ump2.find(cc) == ump2.end() || ump2[cc] != ump1[cc])
            {
                isPossible = false;
                break;
            }
        }

        if (isPossible)
        {
            ans.push_back("YES");
        }
        else
        {
            ans.push_back("NO");
        }
    }

    return ans;
}

int main()
{
    vector<string> a;
    vector<string> b;
    a.push_back("acba");
    b.push_back("caab");
    vector<string> ans = StringP(1, a, b);
    cout << ans[0] << endl;
}