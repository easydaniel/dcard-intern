#include <cstdio>
#include <vector>
#include <algorithm>


int main(int argc, char* argv[]) {
  // create timeline from 00:00 ~ 23:59
  vector<int> timeline(2400, 0);
  // Suppose time is 24hr and transform into int. Ex: 14:32 = 1432
  for (int i = 0; i < NUM_OF_INPUT; ++i) {
    int a, d;
    scanf("%d %d", &a, &d);
    // There should be a visitor between a through [a, e)
    timeline[a]++;
    timeline[e]--;
  }
  // Query range
  int s, e;
  scanf("%d %d", &s, &e);
  int mval = 0, val = 0;
  for (int i = s; i <= e; ++i) {
    val += timeline[i];
    mval = max(val, mval);
  }
  printf("%d\n", mval);
  return 0;
}
